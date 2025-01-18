from django.core.management.base import BaseCommand
from chat.utils import load_documents_to_pinecone
import os

class Command(BaseCommand):
    help = 'Load crypto knowledge documents into Pinecone'

    def handle(self, *args, **options):
        data_dir = os.path.join('data', 'crypto_knowledge')
        self.stdout.write(f'Loading documents from {data_dir}')
        try:
            load_documents_to_pinecone(data_dir)
            self.stdout.write(self.style.SUCCESS('Successfully loaded documents into Pinecone'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error loading documents: {str(e)}')) 