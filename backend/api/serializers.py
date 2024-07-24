from rest_framework import serializers
from .models import Model, Category, Role, Prompt

class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class PromptSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True, write_only=True)

    class Meta:
        model = Prompt
        fields = '__all__'#['id', 'name', 'text', 'model', 'temperature', 'categories', 'category_ids', 'json_file']
        
    def create(self, validated_data):
        categories_data = validated_data.pop('category_ids', [])
        prompt = Prompt.objects.create(**validated_data)
        prompt.categories.set(categories_data)
        return prompt
    
    def update(self, instance, validated_data):
        categories_data = validated_data.pop('category_ids')
        instance.name = validated_data.get('name', instance.name)
        instance.text = validated_data.get('text', instance.text)
        instance.model = validated_data.get('model', instance.model)
        instance.temperature = validated_data.get('temperature', instance.temperature)
        if 'json_file' in validated_data:
            instance.json_file = validated_data.get('json_file', instance.json_file)
        instance.save()
        instance.categories.set(categories_data)
        return instance

    def validate(self, data):
        if 'temperature' in data and data['temperature'] is not None:
            if data['temperature'] < 0 or data['temperature'] > 2:
                raise serializers.ValidationError("Temperature must be between 0 and 2")
        return data
