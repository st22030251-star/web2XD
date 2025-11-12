import requests
import random

url = 'http://localhost:3000/base/create'

nombres = ['Juan', 'Luis', 'Ana', 'Maria', 'Carlos', 'Jose', 'Luisa', 'Pedro', 'Sofia', 'Miguel']
apellidos = ['Torres', 'Perez', 'Gomez', 'Rodriguez', 'Lopez', 'Diaz', 'Martinez', 'Sanchez', 'Ramirez', 'Vega']
grupos = ['A-1', 'A-2', 'B-1', 'B-2', 'C-1', 'C-2']

for _ in range(30):
    data = {}
    if random.random() > 0.2:  # 80% chance de incluir nombre
        data['nombre'] = random.choice(nombres)
    if random.random() > 0.2:  # 80% chance de incluir apellido
        data['apellido'] = random.choice(apellidos)
    if random.random() > 0.3:  # 70% chance de incluir grupo
        data['grupo'] = random.choice(grupos)
    if random.random() > 0.25: # 75% chance de incluir puntosextra
        data['puntosextra'] = str(random.randint(0, 10))
    
    response = requests.post(url, json=data)
    print(f"Status: {response.status_code}, Payload: {data}")