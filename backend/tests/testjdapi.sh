# curl http://127.0.0.1:8000/jd

curl -X POST -H "Content-Type: application/json" -d '{"job_description": "hello"}' http://127.0.0.1:8000/jd

# curl -H "apikey: sb_publishable_kX5MogJvs5ekIrSr-v1rjQ_vqsUdaUd" \
#      -H "Authorization: Bearer sb_publishable_kX5MogJvs5ekIrSr-v1rjQ_vqsUdaUd" \
#      "https://yldvdgyehndhqchnvjis.supabase.co/rest/v1/users_job_descriptions?select=count"