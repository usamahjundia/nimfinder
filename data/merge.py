import json

with open('mahasiswa_compressed.json','r') as f:
    dataold = json.load(f)

with open('mahasiswadata.json','r') as f:
    datanew = json.load(f)

nimset = set()

data_merged = []

for dn in datanew:
    data_merged.append(dn)
    nimset.add(dn[1])
diff = 0
for do in dataold:
    juridx = 2 if do[1] else 3
    # print(do)
    year = int(do[juridx][3:5])
    if year < 10:
        continue
    if do[juridx] in nimset:
        continue
    diff += 1
    newformat = []
    newformat.append(do[0])
    newformat.append(do[juridx])
    if juridx == 3:
        newformat.append(do[2])
    data_merged.append(newformat)

with open('datamahasiswa.json','w') as f:
    json.dump(data_merged,f)
print(diff)