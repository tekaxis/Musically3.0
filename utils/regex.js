let urls = ['http://youtube.com', "https://youtube.com", 'http://www.youtube.com/', 'https://www.youtube.com/', 'http://youtu.be/',
    'https://youtu.be/', "http://redtube.com", "https://redtube.com", "http://music.youtube.com", "https://music.youtube.com"]

module.exports = (url) => {

    let toggle = false;

    if (url.startsWith(urls[0]) || url.startsWith(urls[1]) || url.startsWith(urls[2]) || url.startsWith(urls[3]) || url.startsWith(urls[4]) || url.startsWith(urls[5]) || url.startsWith(urls[6]) || url.startsWith(urls[7]) || url.startsWith(urls[8]) || url.startsWith(urls[9])) {

        return true;
    }
    return toggle

}