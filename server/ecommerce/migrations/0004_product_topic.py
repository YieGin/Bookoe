# Generated by Django 4.2.7 on 2024-01-11 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0003_product_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='topic',
            field=models.TextField(blank=True, null=True),
        ),
    ]
