# Generated by Django 5.0 on 2024-01-01 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_alter_tasks_title"),
    ]

    operations = [
        migrations.AlterField(
            model_name="tasks",
            name="title",
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
