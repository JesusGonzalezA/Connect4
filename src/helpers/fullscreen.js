export const toggleFullScreen = () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
      if(document.body.requestFullscreen)
        document.body.requestFullscreen()
      else if(document.webkitRequestFullscreen)
        document.body.webkitRequestFullscreen()

        return true
    } 
    else
    {
        if(document.exitFullscreen)
        document.exitFullscreen()
        else if(document.webkitExitFullscreen)
        document.webkitExitFullscreen()

        return false
    }
}