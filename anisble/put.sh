#!/bin/bash


line=0

while [ $line -lt 50]; do
    let line=line+1
    name=$(nl people.txt | grep -w $line |  awk '{print $2}' | awk -F "," '${print $1, $print $2}')
    lastName=$(nl people.txt | grep -w $line |  awk '{print $2}' | awk -F "," '${print $1, $print $2}')
    mysql -u root -p<passwd> <db> -e "insert into <table> values ($line, '$nam', '$lastname')
done
