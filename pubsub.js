/**
 * Simple pub sub helper
 **/
class Pubsub {

  /**
   * Create a new pubsub helper
   **/
  constructor(ascoltatore) {
    this._ascoltatore = ascoltatore
    this._timeout = 35000
  }

  /**
   * Publish messages
   */
  publish(topic, value, options) {
    //console.log('Publishing topic %s', topic, value, options)
    this._ascoltatore.publish(topic, value, options)
  }

  /**
   * Subscribe to messages
   */
  subscribe(t, cb) {
    this._ascoltatore.subscribe(t, (topic, value, options) => {
      //console.log('Received topic %s', topic)
      const payload = cb(value, options)

    //   if (payload && !(payload instanceof Promise)) {
    //     console.log('Reply with payload', payload)
    //   }
    })
  }
}

module.exports = Pubsub
