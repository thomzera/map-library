from uuid import uuid4

from django.db import models

# Create your models here.


class Books(models.Model):
    id_book = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    create_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
