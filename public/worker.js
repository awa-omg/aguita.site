import { pipeline, env } from "@huggingface/transformers"

// Disable local model check to avoid caching issues
env.allowLocalModels = false
env.allowRemoteModels = true

// Singleton pattern for the pipeline
class PipelineSingleton {
  static task = "text-generation"
  static model = null
  static instance = null

  static async getInstance(model, progress_callback = null) {
    if (this.instance === null || this.model !== model) {
      this.model = model
      this.instance = pipeline(this.task, model, {
        dtype: "q4",
        device: "webgpu",
        progress_callback,
      })
    }
    return this.instance
  }
}

// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
  const { type, payload } = event.data

  if (type === "load") {
    const { model } = payload
    try {
      self.postMessage({ type: "status", status: "initiate" })
      
      const generator = await PipelineSingleton.getInstance(model, (x) => {
        self.postMessage({ type: "progress", data: x })
      })

      self.postMessage({ type: "status", status: "ready" })
    } catch (error) {
      self.postMessage({ type: "error", error: error.message || "Failed to load model" })
    }
  }

  if (type === "generate") {
    const { messages, model } = payload
    try {
      const generator = await PipelineSingleton.getInstance(model)
      
      let response = ""
      
      // Use streamer for token-by-token generation
      const { TextStreamer } = await import("@huggingface/transformers")
      const streamer = new TextStreamer(generator.tokenizer, {
        skip_prompt: true,
        skip_special_tokens: true,
        callback_function: (token) => {
          response += token
          self.postMessage({ type: "token", token, response })
        },
      })

      await generator(messages, {
        max_new_tokens: 256,
        temperature: 0.7,
        streamer,
      })

      self.postMessage({ type: "complete", response })
    } catch (error) {
      self.postMessage({ type: "error", error: error.message || "Generation failed" })
    }
  }
})
