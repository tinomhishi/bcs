from django.http import HttpResponseRedirect
from django.shortcuts import render
import logging
import requests
from pyzbar.pyzbar import decode 
from PIL import Image

from .forms import UploadFileForm

logging.basicConfig(filename="logs/barcodes.log", level=logging.INFO)


def home(request):
	if request.method == 'POST':
		form = UploadFileForm(request.POST, request.FILES)
		if form.is_valid():
			data = decode(Image.open(request.FILES['file']))
			data = data[0][0]
			data = data.decode('utf-8')
			logging.info(data)
			payload = {'data': data}
			requests.post('http://127.0.0.1:5000/',json=payload)
			return HttpResponseRedirect('/')
	else:
		form = UploadFileForm()
	return render(request, 'index.html', {'form': form})

def handle_uploaded_file(f):
	payload = {'data': f}
	requests.post('http://127.0.0.1:5000/',json=payload)
	
