FROM jenkins/jenkins


USER root

# install pip

RUN  curl https://bootstrap.pypa.io/get-pip.py -o "get-pip.py" && python get-pip.py


apt-get -y install docker-ce


RUN usermod -aG docker
