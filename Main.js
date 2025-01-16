const fs=require("fs");
function decodeBV(val,base) 
{
    return parseInt(val,base);
}
function lagrangeinterpolation(points) 
{
    let constantTerm=0;
    for(let i=0;i<points.length;i++) 
    {
    let xi=points[i][0];
    let yi=points[i][1];
    let term=yi;
    for(let j=0;j<points.length;j++) 
    {
        if(i!==j) 
            {
            term*= -points[j][0];
            term/=xi-points[j][0];
        }
    }
    constantTerm+=term;
    }
    return Math.round(constantTerm);
}
function findconst(tc) 
{
    const {n,k}=tc.keys;
    let pts=[];
    for(let i=1;i<=n;i++) 
    {
    if(tc[i]) 
    {
        const base=parseInt(tc[i].base);
        const val=tc[i].value;
        const x=i;
        const y=decodeBV(val, base);
        pts.push([x, y]);
    }
    }
    pts=pts.slice(0,k);
    return lagrangeinterpolation(pts);
}

function main() 
{
    const tc1=JSON.parse(fs.readFileSync("tc1.json","utf-8"));
    const tc2=JSON.parse(fs.readFileSync("tc2.json","utf-8"));
    const c1=findconst(tc1);
    const c2=findconst(tc2);
    console.log(`Constant term for Testcase 1:${c1}`);
    console.log(`Constant term for Testcase 2:${c2}`);
}
main();
