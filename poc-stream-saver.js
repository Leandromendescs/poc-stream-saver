//Example of download of a file using stream and the StreamSaver Library
//Made by leandromcs

$start.onclick = () => {
    const url = 'https://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4'
    const fileStream = streamSaver.createWriteStream('cat.mp4')

    fetch(url).then(res => {
      const readableStream = res.body

      if (window.WritableStream && readableStream.pipeTo) {
        return readableStream.pipeTo(fileStream)
          .then(() => console.log('done writing'))
      } else {
        window.writer = fileStream.getWriter()

        const reader = res.body.getReader()
        const pump = () => reader.read()
          .then(res => res.done
            ? writer.close()
            : writer.write(res.value).then(pump))
  
        pump()
      }
    })
  }