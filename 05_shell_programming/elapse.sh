# 명령어 실행 시간 측정
#!/bin/bash
st=$(date +%N)
echo "\"$*\"결과"
eval "$*"
fin=$(date +%N)
echo "Elapsed Time: "`expr $fin - $st`" ns"
