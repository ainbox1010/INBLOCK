from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from .models import EmailVerification

def send_verification_email(user):
    # Create verification token
    verification = EmailVerification.objects.create(user=user)
    
    # Create verification URL
    verification_url = f"{settings.FRONTEND_URL}/verify-email?token={verification.token}"
    
    # Email content
    subject = 'Verify your InBlock AI account'
    html_message = render_to_string('users/verification_email.html', {
        'user': user,
        'verification_url': verification_url,
        'code': str(verification.token)[:6].upper()  # First 6 chars as verification code
    })
    
    # Send email
    send_mail(
        subject=subject,
        message=f'Your verification code is: {str(verification.token)[:6].upper()}',
        html_message=html_message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[user.email],
        fail_silently=False,
    )
    
    return verification 