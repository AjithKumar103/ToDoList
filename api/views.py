from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tasks
from .serializers import TaskSerializer


@api_view(["GET"])
def listTask(request):
    tasks = Tasks.objects.all().order_by("-id")
    serializer = TaskSerializer(instance=tasks, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def detailTask(request, pk):
    tasks = Tasks.objects.get(id=pk)
    serializer = TaskSerializer(instance=tasks)
    return Response(serializer.data)


@api_view(["POST"])
def createTask(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response(serializer.data)


@api_view(["PUT"])
def updateTask(request, pk):
    task = Tasks.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response(serializer.data)


@api_view(["DELETE"])
def deleteTask(request, pk):
    task = Tasks.objects.get(id=pk)
    task.delete()
    return Response(f"id: {pk} is deleted!")
