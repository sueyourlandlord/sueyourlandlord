import camelot
import os
import numpy as np
import sys

print("converting pdf into one csv file in $(pwd)/output, this may take a while")
sys.stdout.flush()

tables = camelot.read_pdf('Datenanalyse_LHM_Mietspiegel_2019.pdf',"all")

tables.export('output/foo.csv', f='csv', compress=False) # json, excel, html, markdown, sqlite


for file in os.listdir('output'):
    with open("output/" + file, 'r') as input_file:
        lines = input_file.readlines()
        input_you_need = lines[2:]
    with open("output/" + file, 'w') as input_file:
        input_file.writelines(input_you_need)


concat_lines = np.array(['"Miete","Bezirk"\n'])
for file in os.listdir('output'):
    with open("output/" + file, 'r') as input_file:
        lis = input_file.readlines()
        # print(lis)
        read_array = np.array(lis)
        concat_lines = np.concatenate((concat_lines,read_array))
    os.remove("output/" + file)

with open("output/" + "rent_per_district.csv", 'w') as output_file:
    output_file.writelines(concat_lines)


