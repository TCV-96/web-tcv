import json
import os

base_dir = r"C:\Users\User\Documents\WEB TCV"
files_to_include = [
    "index.html",
    "carmvencito.js",
    "CARMVENCITO_CONOCIMIENTO.txt",
    os.path.join("admin", "config.yml")
]

context = {
    "system_instruction": "Eres un asistente experto ayudando a desarrollar y mejorar el sitio web de T.C.V. TechnologyCarmven. A continuación tienes los archivos del proyecto.",
    "files": {}
}

for file_path in files_to_include:
    full_path = os.path.join(base_dir, file_path)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            context["files"][file_path] = f.read()

output_path = os.path.join(base_dir, "prompt_gemini.json")
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(context, f, ensure_ascii=False, indent=2)

print("JSON file created successfully")
