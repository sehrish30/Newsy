const getHostName = (url) =>{
  return new URL(url).hostname;
}

export default getHostName