from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):

    def validate_year(self, value):
        if value < 1 or value > 4:
            raise serializers.ValidationError(
                "Year must be between 1 and 4."
            )
        return value

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError(
                "Phone number must be exactly 10 digits."
            )
        return value

    class Meta:
        model = Student
        fields = '__all__'