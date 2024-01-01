from django.db import models

# Create your models here.


class Tasks(models.Model):
    title = models.CharField(max_length=256, null=True, blank=True)
    description = models.TextField(null=True)
    completed = models.BooleanField(default=False, null=False, blank=False)

    def __str__(self) -> str:
        return self.title
