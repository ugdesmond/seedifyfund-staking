import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { IDO_CONFIG, getRate } from '../scripts/constants/ ido_config';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers }: any = hre;
  const [deployer] = await ethers.getSigners();
  console.log('deployer===', await deployer.getAddress());

  const { deploy } = deployments;

  for (let i = 0; i < IDO_CONFIG.names.length; i++) {
    const name = `${IDO_CONFIG.names[i]}, ${IDO_CONFIG.aprs[i]}% APR`;
    const apr = IDO_CONFIG.aprs[i];
    const lockDuration = IDO_CONFIG.days[i];
    const rate = getRate(apr, lockDuration);
    const roundDownRate = Math.floor(rate);

    const result = await deploy('IDOLocking', {
      from: (await deployer.getAddress()).toString(),
      args: [name, IDO_CONFIG.tokenAddress, roundDownRate, lockDuration * 24],
      log: true,
      waitConfirmations: 5,
    });

    if (result.newlyDeployed) {
      await hre.run('verify:verify', {
        address: result.address,
        constructorArguments: [
          name,
          IDO_CONFIG.tokenAddress,
          roundDownRate,
          lockDuration * 24,
        ],
      });
    }

    console.log(`IDOLocking ${name} deployed to: ${result.address}`);
    console.log(`Round down rate: ${roundDownRate}\n`);
  }
};

func.tags = ['IDOLocking'];
export default func;
