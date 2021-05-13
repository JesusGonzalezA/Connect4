export const getKeyFromEvent = ( event ) => {
    return event.key || event.which
} 
  
export const normalizeCoordinates = ( clientX, clientY ) => {
    const x = ( clientX / window.innerWidth ) * 2 - 1
    const y = 1 - 2 * ( clientY / window.innerHeight ) 
    return { x, y }
}