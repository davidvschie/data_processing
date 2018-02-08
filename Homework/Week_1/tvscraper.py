#!/usr/bin/env python
# Name: David van Schie
# Student number: 10800999
"""
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
"""

import csv
import requests
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

    
def extract_tvseries(dom):
    """
    Extract a list of highest rated TV series from DOM (of IMDB page).
    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    """

    rget = requests.get(TARGET_URL)
    soup = BeautifulSoup(rget.text, "html.parser")

    # all movie info can be found in div classes called 'lister-item mode-advanced'
    allmovies = soup.find_all('div', class_ = 'lister-item mode-advanced')

    title = []
    rating = []
    runtimes = []
    genre = []

    for i in allmovies:
        title.append(i.h3.a.text)
        rating.append(i.strong.text)
        runtimes.append(i.find('span', class_='runtime').text)
        genre.append(i.find('span', class_ = 'genre').text.split())


    file = open("hallo.csv", "w")

    writer = csv.writer(file)   

    writer.writerow(['Title', 'Rating', 'Genre', 'Runtime'])

    for i in range(50):

        writer.writerow((title[i], rating[i], genre[i], runtimes[i]))

    file.close()


def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None
    except RequestException as e:
        print('The following error occurred during HTTP GET request to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns true if the response seems to be HTML, false otherwise
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


if __name__ == "__main__":

    # get HTML content at target URL
    html = simple_get(TARGET_URL)

    # save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # parse the HTML file into a DOM representation
    dom = BeautifulSoup(html, 'html.parser')

    # extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'w', newline='') as output_file:
        save_csv(output_file, tvseries)