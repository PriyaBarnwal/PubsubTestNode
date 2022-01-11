var redis = require('redis'),
    ascoltatori = require('ascoltatori'),
    Pubsub = require('./pubsub')

var startTime =[],
    diff=[]
var start = (cb) => {
    var host = "flowai-dev.hxzxkr.ng.0001.usw2.cache.amazonaws.com",
          port = 6379
    // Configuration for ascoltatori
    var settings = {
      type: 'redis',
      redis,
      port,
      host
    }
    ascoltatori.build(settings, (err, ascoltatore) => {
      if (err) {
        // Do something with the error
        console.error('FAILED TO START APP', err)

      } else {

        console.log('Started new ascoltatore (pubsub) instance with redis host:', host, port)

        // Wrap ascoltatore in a helper
        var pubsub = new Pubsub(ascoltatore)
        // Run the server
        pubsub.subscribe("test/topic",(val, opts)=> {
            console.log(" received val:", val)
            diff.push(Date.now()- startTime[val])

            if(val==10) {
                const sum= diff.reduce((a,b) => a + b, 0)
                const avg = sum/diff.length
                console.log(sum, avg)
            }
        })

        cb(pubsub)
      }
    })
}

start(async pubsub => {
    index=0
    var interval = setInterval(function() {
        if(index==10) {
            clearInterval(interval)
        }
        pubsub.publish("test/topic", index)
        console.log("sending data:",index)
        startTime.push(Date.now())
        index++
      }, 1000);
})
