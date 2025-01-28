from django.contrib import admin
from .models import Conversation, Message
from django.urls import path
from django.http import HttpResponse
from django.core.cache import cache
from django.contrib import messages
from django.shortcuts import redirect

class ChatAdmin(admin.ModelAdmin):
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('reset-demo-counters/', 
                 self.admin_site.admin_view(self.reset_demo_counters), 
                 name='reset-demo-counters'),
        ]
        return custom_urls + urls

    def reset_demo_counters(self, request):
        """Reset all demo chat counters"""
        # Get all keys matching demo chat pattern
        keys = cache.keys("demo_chat_*")
        if keys:
            cache.delete_many(keys)
            messages.success(request, f"Successfully reset {len(keys)} demo counters")
        else:
            messages.info(request, "No demo counters found to reset")
        
        return redirect('admin:index')

admin.site.register(Conversation, ChatAdmin)
admin.site.register(Message) 