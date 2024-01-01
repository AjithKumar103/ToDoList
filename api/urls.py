from django.urls import path
from . import views

urlpatterns = [
    path("task-list/", views.listTask, name="task-list"),
    path("task-detail/<int:pk>", views.detailTask, name="detail-list"),
    path("task-create/", views.createTask, name="task-create"),
    path("task-update/<int:pk>/", views.updateTask, name="task-update"),
    path("task-delete/<int:pk>/", views.deleteTask, name="task-delete"),
]
