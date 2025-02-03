from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, PasswordResetToken, EmailVerification

class CustomUserAdmin(UserAdmin):
    ordering = ['email']
    list_display = ['email', 'is_staff', 'is_active', 'is_email_verified', 'created_at']
    search_fields = ['email']
    readonly_fields = ['created_at']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'is_email_verified', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'created_at')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

class EmailVerificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at', 'expires_at', 'is_used']
    search_fields = ['user__email']
    readonly_fields = ['token', 'created_at', 'expires_at']

admin.site.register(User, CustomUserAdmin)
admin.site.register(EmailVerification, EmailVerificationAdmin)
admin.site.register(PasswordResetToken)