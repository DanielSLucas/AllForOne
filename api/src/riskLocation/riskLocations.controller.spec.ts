import { Test, TestingModule } from '@nestjs/testing';
import {
  PointLocation,
  RiskLocationDocument,
} from './schemas/riskLocation.schema';
import { RiskLocationsController } from './riskLocations.controller';
import { RiskLocationsService } from './riskLocations.service';

const riskLocations: RiskLocationDocument[] = [
  {
    _id: '633b60a7f656f3163bb55907',
    location: new PointLocation({
      lat: 12,
      long: 34,
    }),
    risk: 'Risk 1 title',
    description: 'Risk 1 description',
    created_by: 'user_id' as any,
  } as RiskLocationDocument,
  {
    _id: '633b60e8f656f3163bb55909',
    location: new PointLocation({
      lat: 43,
      long: 21,
    }),
    risk: 'Risk 2 title',
    description: 'Risk 2 description',
    created_by: 'user_id' as any,
  } as RiskLocationDocument,
];

describe('RiskLocationsController', () => {
  let riskLocationsController: RiskLocationsController;
  let riskLocationsService: RiskLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskLocationsController],
      providers: [
        {
          provide: RiskLocationsService,
          useValue: {
            create: jest.fn().mockResolvedValue(riskLocations[0]),
            findAll: jest.fn().mockResolvedValue(riskLocations),
            update: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn().mockResolvedValue(riskLocations[0]),
            findNearTo: jest.fn().mockResolvedValue([riskLocations[0]]),
          },
        },
      ],
    }).compile();

    riskLocationsController = module.get<RiskLocationsController>(
      RiskLocationsController,
    );
    riskLocationsService =
      module.get<RiskLocationsService>(RiskLocationsService);
  });

  it('should be defined', () => {
    expect(riskLocationsController).toBeDefined();
    expect(riskLocationsService).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create a riskLocation.', async () => {
      const result = await riskLocationsController.create({
        ...riskLocations[0],
        coords: {
          lat: riskLocations[0].location.coordinates[0],
          long: riskLocations[0].location.coordinates[1],
        },
        created_by: 'user_id',
      });

      expect(result).toEqual(riskLocations[0]);
    });
  });

  describe('update', () => {
    it("should be able to update a riskLocation's info", async () => {
      jest.spyOn(riskLocationsService, 'update').mockResolvedValueOnce({
        ...riskLocations[0],
        risk: 'New riskLocation name',
      });

      const result = await riskLocationsController.update(
        riskLocations[0]._id,
        {
          ...riskLocations[0],
          risk: 'New riskLocation name',
          coords: {
            lat: riskLocations[0].location.coordinates[0],
            long: riskLocations[0].location.coordinates[1],
          },
        },
      );

      expect(result.risk).toEqual('New riskLocation name');
    });
  });

  describe('delete', () => {
    it('should be able to delete a riskLocation', async () => {
      const deleteFunction = jest.spyOn(riskLocationsService, 'delete');

      await riskLocationsController.delete('riskLocation id');

      expect(deleteFunction).toHaveBeenCalledWith('riskLocation id');
      expect(deleteFunction).not.toThrow();
    });
  });

  describe('findById', () => {
    it('should be able to find a riskLocation by its id', async () => {
      const riskLocation = await riskLocationsController.findById(
        riskLocations[0]._id,
      );

      expect(riskLocation).toEqual(riskLocations[0]);
    });
  });

  describe('findAll', () => {
    it('should be able to list all riskLocations.', async () => {
      const result = await riskLocationsController.findAll();

      expect(result).toEqual(riskLocations);
    });
  });

  describe('findNearTo', () => {
    it('should be able to list riskLocations in a radius', async () => {
      const riskLocation = await riskLocationsController.findNearTo({
        coords: [
          riskLocations[0].location.coordinates[0],
          riskLocations[0].location.coordinates[1],
        ].join(','),
        radius: '1000',
      });

      expect(riskLocation).toEqual([riskLocations[0]]);
    });
  });
});
