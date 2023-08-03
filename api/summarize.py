import http.server
import urllib.parse
import json
from youtube_transcript_api import YouTubeTranscriptApi

def get_youtube_transcript(url: str):
    transcript_list = YouTubeTranscriptApi.list_transcripts(url)
    # iterate over all available transcripts
    text = ''
    for transcript in transcript_list:

        # the Transcript object provides metadata properties
        print(
            transcript.language,
            transcript.language_code
        )

        # fetch the actual transcript data
        # print(transcript.fetch())
        for item in transcript.fetch():
            text += item['text']
            text += "\n"
    return text

class handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        print(f"[do_GET]Entering path {self.path}\n")
        parsed_url = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_url.query)
        url = query_params.get('url', [''])[0]
        data = get_youtube_transcript(url)
        self.wfile.write(bytes(json.dumps(data), 'utf-8'))
