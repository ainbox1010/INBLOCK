from django.core.management.base import BaseCommand
from chat.services import ChatService
import json

class Command(BaseCommand):
    help = 'Test CoinGecko API integration'

    def handle(self, *args, **options):
        service = ChatService()
        
        # Test getting Bitcoin price history
        self.stdout.write("Testing Bitcoin price history...")
        btc_data = service.get_coin_history('bitcoin', '7')
        
        if 'error' in btc_data:
            self.stdout.write(self.style.ERROR(f"Error: {btc_data['error']}"))
        else:
            self.stdout.write(self.style.SUCCESS("Successfully fetched Bitcoin data:"))
            # Print first few data points
            prices = btc_data.get('prices', [])[:3]
            self.stdout.write(json.dumps(prices, indent=2))

        # Test getting coin list
        self.stdout.write("\nTesting coin list...")
        coins = service.get_coin_list()
        if not coins:
            self.stdout.write(self.style.ERROR("Error fetching coin list"))
        else:
            self.stdout.write(self.style.SUCCESS(f"Successfully fetched {len(coins)} coins"))
            # Print first few coins
            self.stdout.write(json.dumps(coins[:3], indent=2)) 