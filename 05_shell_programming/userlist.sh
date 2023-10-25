# 사용자 계정 목록 출력
#!/bin/bash
cat /etc/passwd | awk -F ":" '{printf("%d	%s\n", $3, $1)}' | sort -n
