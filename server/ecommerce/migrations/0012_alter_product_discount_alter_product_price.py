# Generated by Django 4.2.7 on 2024-01-21 01:58

from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0011_alter_product_stars'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='discount',
            field=models.DecimalField(decimal_places=2, default=Decimal('0.99'), max_digits=4),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, default=Decimal('0.99'), max_digits=6),
        ),
    ]
