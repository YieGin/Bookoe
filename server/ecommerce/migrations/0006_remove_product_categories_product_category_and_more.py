# Generated by Django 5.0 on 2024-01-12 01:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0005_category_remove_product_category_product_categories'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='categories',
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.CharField(blank=True, choices=[('Action/Fantasy', 'Action/Fantasy'), ('Adventure', 'Adventure'), ('History', 'History'), ('Animation', 'Animation'), ('Horror', 'Horror'), ('Biography', 'Biography'), ('Mystery', 'Mystery'), ('Comedy', 'Comedy'), ('Romance', 'Romance'), ('Crime', 'Crime'), ('Sci-fi', 'Sci-fi'), ('Documentary', 'Documentary'), ('Sport', 'Sport')], max_length=100, null=True),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]
