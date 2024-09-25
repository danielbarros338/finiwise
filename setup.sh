#!/bin/bash

yarn migrate
if [ $? -ne 0 ]; then
  echo "Migration failed"
  exit 1
fi

yarn seed:all
if [ $? -ne 0 ]; then
  echo "Seeding failed"
  exit 1
fi

yarn start:prod

echo "Setup completed"
exit 0