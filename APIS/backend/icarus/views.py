from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .utils import data_querying

@api_view(['POST'])
@parser_classes([JSONParser])
def data_querying_view(request):
    input_text = request.data.get('input_text')
    response, sources = data_querying(input_text)  # Retrieve both the response and sources
    return Response({'response': response, 'sources': sources})
