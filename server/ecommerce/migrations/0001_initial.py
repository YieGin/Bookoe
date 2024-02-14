# Generated by Django 5.0 on 2024-01-08 23:40

import django.db.models.deletion
from decimal import Decimal
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('image', models.ImageField(upload_to='products/')),
                ('discount', models.DecimalField(decimal_places=2, default=Decimal('0.00'), max_digits=4)),
                ('category', models.CharField(blank=True, choices=[('Action/Fantasy', 'Action/Fantasy'), ('Adventure', 'Adventure'), ('History', 'History'), ('Animation', 'Animation'), ('Horror', 'Horror'), ('Biography', 'Biography'), ('Mystery', 'Mystery'), ('Comedy', 'Comedy'), ('Romance', 'Romance'), ('Crime', 'Crime'), ('Sci-fi', 'Sci-fi'), ('Documentary', 'Documentary'), ('Sport', 'Sport')], max_length=100, null=True)),
                ('stars', models.DecimalField(blank=True, decimal_places=1, max_digits=2, null=True)),
                ('author', models.CharField(blank=True, max_length=255, null=True)),
                ('isbn', models.CharField(blank=True, max_length=13, null=True)),
                ('published_year', models.CharField(max_length=255)),
                ('publisher', models.CharField(blank=True, max_length=255, null=True)),
                ('in_stock', models.BooleanField(default=True)),
                ('free_shipping', models.BooleanField(default=False)),
                ('shipping_price', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('book_format', models.CharField(blank=True, max_length=50, null=True)),
                ('language', models.CharField(blank=True, max_length=50, null=True)),
                ('tags', models.TextField(blank=True, null=True)),
                ('sales_count', models.PositiveIntegerField(default=0)),
                ('is_best_seller', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerce.product')),
            ],
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerce.product')),
            ],
        ),
    ]