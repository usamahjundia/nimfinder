import json

with open('mahasiswadata.json','r') as f:
    data = json.load(f)

parseddata = []

for mhs in data:
    temp = []
    nama = mhs["nama"]
    temp.append(nama)
    nimtpb = mhs.get("nimtpb",None)
    nimjur = mhs.get("nim",None)
    if nimjur == None:
        temp.append(True)
        temp.append(nimtpb)
    else:
        temp.append(False)
        temp.append(nimtpb)
        temp.append(nimjur)
    parseddata.append(temp)

with open('mahasiswa_compressed.json','w') as f:
    json.dump(parseddata,f)
