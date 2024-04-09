from django.contrib import admin
from .models import FineTunedModel, TrainingData

# Register your models here.
@admin.register(FineTunedModel)
class FineTunedModelAdmin(admin.ModelAdmin):
    list_display = ('model_name', 'base_model')
    search_fields = ('model_name', 'base_model')


@admin.register(TrainingData)
class TrainingDataAdmin(admin.ModelAdmin):
    #TrainingData 모델에 대한 Django admin의 목록보기에서 표시할 필드를 정의.
    #As is_fine_tuned and will_be fine_tuned have been added to this list
    #in the updated code, now these fields are displayed
    list_display = ('prompt', 'completion', 'fine_tuned_model', 'is_fine_tuned', 'will_be_fine_tuned')
    #This tuple specifies the fields to search when using the search box in the Django Admin interface.
    #The fine_tuned_model__model_name field allows searching by the model_name of the related
    #FineTunedModel instance. No changes have been made here
    search_fields = ('prompt', 'completion', 'fine_tuned_model__model_name')
    #this tuple defines the filters available in Django admin interface
    #those filters appear on the right sidebar of the list view. In the updated code,
    #is_fine_tuned and will_be_fine_tuned have been added to this list,
    #allowing you to filter the list of TrainingData instances by these fields.
    list_filter = ('fine_tuned_model', 'is_fine_tuned', 'will_be_fine_tuned')