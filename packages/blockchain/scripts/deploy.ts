import { ethers } from "hardhat";

async function main() {
  console.log("--- BẮT ĐẦU DEPLOY SMART CONTRACT DIGVOS SBT ---");

  // Lấy danh sách ví tài khoản từ mạng
  const [deployer] = await ethers.getSigners();
  console.log(`Đang deploy bằng ví của: ${deployer.address}`);

  // Lấy balance ví deployer
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log(`Số dư ví deployer: ${ethers.formatEther(balance)} ETH/MATIC`);

  // Lấy contract factory
  const DigvosSBT = await ethers.getContractFactory("DigvosSBT");
  
  console.log("Đang gửi giao dịch khởi tạo contract...");
  const sbt = await DigvosSBT.deploy();

  // Đợi contract được deploy thành công
  await sbt.waitForDeployment();

  const contractAddress = await sbt.getAddress();
  console.log(`✅ DEPLOY THÀNH CÔNG!`);
  console.log(`Địa chỉ Smart Contract SBT: ${contractAddress}`);
  console.log("-------------------------------------------------");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Lỗi deploy:", error);
    process.exit(1);
  });
