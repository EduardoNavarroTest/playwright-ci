const { test, request, expect } = require('@playwright/test');

test('hacer petición POST manual', async ({ request }) => {
    const response = await request.post(
        'https://test.puertocartagena.com/test-sprconline_7/SPRCOnLine.nsf/EBK10SP?OpenForm&ParentUNID=C18C618481FF86FF05258CD500652E93',
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": "rdtrk=%7B%22id%22%3A%222f6a5eb5-c7d5-4943-a55e-82721a235636%22%7D; _hjSessionUser_3302222=eyJpZCI6IjMwMDkxODk4LWM0NWYtNWU0OC1hNjk5LWEwNmY4ZTM0ZTY4ZCIsImNyZWF0ZWQiOjE2OTI5NzEyMTk0MTQsImV4aXN0aW5nIjp0cnVlfQ==; x-bni-fpc=3ef5b356c8facf4fe10d36a6a4a4e889; x-bni-rncf=a03uimNeSrEJSKCYH8Kkzirthn6RtTPTelN3Q6p-oOA=; _gcl_au=1.1.1038191691.1748954490; _hjSessionUser_3302192=eyJpZCI6IjFkMWRjNTRjLTliOGEtNTI3Ny1iMWU2LWJmZWM3OWQ3N2E2MyIsImNyZWF0ZWQiOjE3NDg5NTQ0ODk1MDIsImV4aXN0aW5nIjp0cnVlfQ==; _ga=GA1.1.379755155.1692971219; __trf.src=encoded_eyJmaXJzdF9zZXNzaW9uIjp7InZhbHVlIjoiKG5vbmUpIiwiZXh0cmFfcGFyYW1zIjp7fX0sImN1cnJlbnRfc2Vzc2lvbiI6eyJ2YWx1ZSI6Imh0dHBzOi8vc21hcnRwZW9wbGUucHVlcnRvY2FydGFnZW5hLmNvbS8iLCJleHRyYV9wYXJhbXMiOnt9fSwiY3JlYXRlZF9hdCI6MTc1MDk1MTYyMDY1Mn0=; _ga_CFK35152D0=GS2.1.s1750951612$o4$g1$t1750951694$j59$l0$h0; _ga_NL517R1PQV=GS2.1.s1750951612$o4$g1$t1750951694$j59$l0$h0; _ga_XWG24HZ5LX=GS2.1.s1750951612$o6$g1$t1750951694$j59$l0$h1723354075; LtpaToken=AAECAzY4ODdDMDEyNjg4N0RDMzJlZHVhcmRvdGVyR3zWr4vdPaknyOEU35UsnmgaxJs=",
            },
            data: new URLSearchParams({
                "__Click": "0525807B006F0259.ad21c186281e6dcb05256ed1007679e8%2F0.232E",
                "ContainerClass": "+|+:ALIMENTOS|ALI:GENERAL|GEN:LCL+ALIMENTOS|LCL:NO+CLASIFICADO|NCL:SALIDA|OUT:REFORZADOS|REZ",
                "CIAX_Terminal": "SPC",
                "UNIT": "PWGX1000055",
                "ACEPTA": "S",
                "UNZ": "20",
                "UNTP": "CT",
                "BILL": "28072025A",
                "CLAS": "NCL",
                "SELLO": "S",
            }).toString()
        }
    );

        // Validar la respuesta
        console.log(await response.text());
        await expect(response).toBeOK();
    

    expect(response.status()).toBe(200); // ejemplo: validamos que la respuesta fue OK
});
