from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=50)
    year = models.IntegerField()
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.name
