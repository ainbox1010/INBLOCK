from django.core.management.base import BaseCommand
from chat.utils import load_documents_to_pinecone
import os

class Command(BaseCommand):
    help = 'Load documents into Pinecone vector database'

    def add_arguments(self, parser):
        parser.add_argument('docs_dir', type=str, help='Directory containing documents to load')

    def handle(self, *args, **options):
        docs_dir = options['docs_dir']
        if not os.path.exists(docs_dir):
            self.stdout.write(self.style.ERROR(f'Directory not found: {docs_dir}'))
            return
            
        try:
            self.stdout.write('Loading documents into Pinecone...')
            load_documents_to_pinecone(docs_dir)
            self.stdout.write(self.style.SUCCESS('Successfully loaded documents'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error loading documents: {str(e)}')) 