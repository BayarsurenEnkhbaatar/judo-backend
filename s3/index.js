
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: "ap-southeast-1",
    credentials: {
        accessKeyId: "AKIATNGBIBDPF7JMTAFJ",
        secretAccessKey: "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",
    },
});

export async function getObjectURL(key){
    console.log(key, "key >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    const command = new GetObjectCommand({
        Bucket: "private-judo-backet",
        Key: key,
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}

export async function putObject(filename, contentType){
    const command = new PutObjectCommand({
        Bucket: "private-judo-backet",
        Key: `/upload/user-uploads/${filename}`,
        ContentType: contentType
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}