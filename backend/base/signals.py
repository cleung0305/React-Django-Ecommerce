from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs) -> None:
    user = instance
    if user.email != '':
        user.username = user.email

pre_save.connect(updateUser, sender=User, dispatch_uid="update_user_identifier")