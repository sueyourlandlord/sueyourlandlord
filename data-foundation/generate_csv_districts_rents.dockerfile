# syntax = docker/dockerfile:1.2

# This script converts a pdf file into a single concatenated csv file
# Usage:
# docker build -t read_pdf -f generate_csv_districts_rents.dockerfile .
# docker run -v $(pwd):/ws read_pdf

FROM ubuntu:focal

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y python3-pip python3-opencv ghostscript python3-tk


RUN pip3 install --upgrade numpy
RUN pip3 install camelot-py ghostscript opencv-python

CMD /bin/bash -c "cd /ws ; mkdir output &>/dev/null ; python3 pdf_import.py"