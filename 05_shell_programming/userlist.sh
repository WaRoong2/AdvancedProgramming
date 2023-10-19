#!/bin/bash
cat /etc/passwd | awk -F ":" '{printf("%d	%s\n", $3, $1)}' | sort -n
