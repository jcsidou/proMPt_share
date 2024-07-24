from django.db import models

class Model(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Role(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Prompt(models.Model):
    name = models.CharField(max_length=100)  # Obrigatório
    text = models.TextField(blank=True)  # Opcional
    model = models.ForeignKey(Model, on_delete=models.CASCADE)  # Obrigatório
    temperature = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)  # Opcional
    categories = models.ManyToManyField(Category, blank=True)  # Opcional
    json_file = models.FileField(upload_to='json_files/', null=True, blank=True)  # Opcional

    def __str__(self):
        return self.name
